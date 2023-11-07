export async function GET(request: Request) {
  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/package-list`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store'
  })
  const packages = await res.json()

  return Response.json({ packages })
}