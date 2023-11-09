export async function GET(request: Request, { params }: { params: { id: string } } ) {
  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/profile/${params.id}`, {
    method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })
  const jsonRes = await res.json()

  return Response.json(jsonRes)
}