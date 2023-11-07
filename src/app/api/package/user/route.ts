export async function GET(request: Request) {
  const info = new URL(request.url)

  const id = info.searchParams.get('id')
  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/package/user/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const userPackages = await res.json()

  return Response.json(userPackages)
}