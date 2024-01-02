const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
export function imageURL(name: string) {
  return `${BASE_URL}/uploads/${name}`;
}
