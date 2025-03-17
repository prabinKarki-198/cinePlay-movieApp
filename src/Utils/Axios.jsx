import axios from "axios";
const instance = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjM5OTUxOTg3OTZiYjY1ZWE4ZjUzYmM5Zjc3NzZhNCIsIm5iZiI6MTc0MTYwOTM5Ni4zOSwic3ViIjoiNjdjZWQ5YjQwNWRhMWE5ZTE1ZTJkMzU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9._J9MD2HEQO7OLa-KmuDNl3LGRHDd_VZxaj5JOVBM7Ms'
      }
})
export default instance