export async function DELETE(request: Request) {
  const data = await request.json()

  const res = await fetch(`https://p4xukwco0h.execute-api.us-east-1.amazonaws.com/Beta/class`, {
    method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
  })
  const jsonRes = await res.json()

  return Response.json(jsonRes)
}