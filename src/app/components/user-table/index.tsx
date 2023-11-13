import {CognitoUser, IClassInfo} from "@/app/types"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"

interface Props {
  cognitoUsers: CognitoUser[]
  seatsInfo: IClassInfo[]
}

export default function UserTable(props: Props) {
  const { cognitoUsers, seatsInfo } = props
  let mutableSeatsInfo = [...seatsInfo]
  const renderUsers = cognitoUsers.map(({user}) => {
    const userId = user.find((info) => info.Name === 'sub')?.Value
    const firstName = user.find((info) => info.Name === 'given_name')?.Value
    const lastName = user.find((info) => info.Name === 'family_name')?.Value
    const size = user.find((info) => info.Name === 'custom:Size')?.Value
    const phone = user.find((info) => info.Name === 'phone_number')?.Value
    const seat = mutableSeatsInfo.find(seatInfo => seatInfo.userId === userId)?.seat
    mutableSeatsInfo = mutableSeatsInfo.filter(seatInfo => seatInfo.seat !== seat)

    return { firstName, lastName, size, phone, seat, userId }
  })

  return (
    <Table className="pt-8" removeWrapper aria-label="Paquetes">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>PHONE</TableColumn>
        <TableColumn>SEAT</TableColumn>
        <TableColumn>SIZE</TableColumn>
      </TableHeader>
      <TableBody>
        {renderUsers.map((selUser) => (
          <TableRow key={`${selUser.userId}${selUser.seat}`}>
            <TableCell>
              <p className='text-xs md:text-base text-black uppercase'>
                {`${selUser.firstName} ${selUser.lastName}`}
              </p>
            </TableCell>
            <TableCell>
              <p className='text-xs md:text-base text-black'>
                {selUser.phone}
              </p>
            </TableCell>
            <TableCell>
              <p className="text-xs md:text-base text-black">
                {selUser.seat}
              </p>
            </TableCell>
            <TableCell>
              <p className="text-xs md:text-base text-black">
                {selUser.size}
              </p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}