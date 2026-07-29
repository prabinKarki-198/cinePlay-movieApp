import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [libraryItems, setLibraryItems] = useState([]);

  // Fetch library items when user logs in or changes
  const fetchLibrary = async (currentUser) => {
    if (!currentUser) {
      setLibraryItems([]);
      return;
    }

    const localKey = `cineplay_lib_${currentUser.id}`;
    const cached = localStorage.getItem(localKey);
    if (cached) {
      try {
        setLibraryItems(JSON.parse(cached));
      } catch (e) {
        // ignore
      }
    }

    try {
      const { data, error } = await supabase
        .from('library')
        .select('*')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        const formatted = data.map((row) => ({
          id: row.item_id,
          db_id: row.id,
          media_type: row.media_type,
          title: row.title,
          poster_path: row.poster_path,
          vote_average: row.vote_average,
          created_at: row.created_at,
        }));
        setLibraryItems(formatted);
        localStorage.setItem(localKey, JSON.stringify(formatted));
      }
    } catch (e) {
      console.warn('Supabase library table query skipped or table not created yet');
    }
  };

  useEffect(() => {
    // Fetch active Supabase session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      fetchLibrary(currentUser);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      fetchLibrary(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async ({ email, password, fullName }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    if (!data.session) {
      try {
        const loginRes = await supabase.auth.signInWithPassword({ email, password });
        if (loginRes.data?.session) {
          setSession(loginRes.data.session);
          setUser(loginRes.data.user);
          fetchLibrary(loginRes.data.user);
          return loginRes.data;
        }
      } catch (e) {
        // ignore
      }
    } else {
      setSession(data.session);
      setUser(data.user);
      fetchLibrary(data.user);
    }

    return data;
  };

  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    setSession(data.session);
    setUser(data.user);
    fetchLibrary(data.user);
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
    setLibraryItems([]);
  };

  // --- Library Management ---
  const isInLibrary = (itemId) => {
    return libraryItems.some((item) => String(item.id) === String(itemId));
  };

  const addToLibrary = async (item, mediaType = 'movie') => {
    if (!user) {
      toast.info('Please log in to save items to your Library!');
      openAuthModal('login');
      return false;
    }

    const itemMedia = mediaType || item.media_type || 'movie';
    const itemTitle = item.title || item.name || item.original_title || item.original_name || 'Untitled';
    const itemPoster = item.poster_path || item.backdrop_path || item.profile_path || '';
    const itemVote = item.vote_average || 0;

    const newItem = {
      id: String(item.id),
      media_type: itemMedia,
      title: itemTitle,
      poster_path: itemPoster,
      vote_average: itemVote,
      created_at: new Date().toISOString(),
    };

    const updated = [newItem, ...libraryItems.filter((i) => String(i.id) !== String(item.id))];
    setLibraryItems(updated);
    localStorage.setItem(`cineplay_lib_${user.id}`, JSON.stringify(updated));

    // Persist to Supabase if database table exists
    try {
      await supabase.from('library').upsert(
        {
          user_id: user.id,
          item_id: String(item.id),
          media_type: itemMedia,
          title: itemTitle,
          poster_path: itemPoster,
          vote_average: itemVote,
        },
        { onConflict: 'user_id, item_id' }
      );
    } catch (e) {
      // ignore table missing error
    }

    toast.success(`"${itemTitle}" added to your Library!`);
    return true;
  };

  const removeFromLibrary = async (itemId) => {
    if (!user) return;

    const target = libraryItems.find((i) => String(i.id) === String(itemId));
    const updated = libraryItems.filter((i) => String(i.id) !== String(itemId));
    setLibraryItems(updated);
    localStorage.setItem(`cineplay_lib_${user.id}`, JSON.stringify(updated));

    try {
      await supabase
        .from('library')
        .delete()
        .eq('user_id', user.id)
        .eq('item_id', String(itemId));
    } catch (e) {
      // ignore
    }

    toast.info(`"${target?.title || 'Item'}" removed from Library.`);
  };

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        authModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
        libraryItems,
        addToLibrary,
        removeFromLibrary,
        isInLibrary,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
