import { Dispatch, SetStateAction, useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, Button} from '@nextui-org/react'
import {ICancelClassModal} from '@/app/types'
import {useAppStore} from '@/app/store'
import {IClassesAndPackages} from '@/app/profile/page'
import {DateTime} from 'luxon'
import { toast } from 'react-toastify'

interface CancelClassModalProps {
  isOpen: boolean
  data: ICancelClassModal
  classesAndPackages: IClassesAndPackages
  setClassesAndPackages: Dispatch<SetStateAction<IClassesAndPackages>>
}

export default function CancelClassModal(props: CancelClassModalProps) {
  const [loading, setLoading] = useState(false)
  const {setCancelClassModal} = useAppStore()
  const classType =  props.data.selectedClass?.type === 'indoor-cycling' ? 'Indoor Cycling' : 'Move'

  const handleClick = async () => {
    const {seat, id} = props.data.selectedClass!
    
    if (props.classesAndPackages.userPackages.length > 0) {
      setLoading(true)
      const userId = props.classesAndPackages.userPackages[0].user_id
      const packageId = props.classesAndPackages.userPackages[0].package_id

      const values = {id, seat, userId, packageId}
      
      try {
        const response = await fetch(`/api/class`, {
          method: 'DELETE',
          body: JSON.stringify(values),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        const jsonRes = await response.json()
        if (response.ok) {
          const classesArr = [...props.classesAndPackages.classes]
          const indexedClass = classesArr.findIndex((item) => ((item.id === props.data.selectedClass?.id) && (item.seat === props.data.selectedClass.seat)))
          classesArr.splice(indexedClass, 1)
          props.setClassesAndPackages({ userPackages: [...props.classesAndPackages.userPackages], classes: classesArr })
        } else {
          console.log(jsonRes)
        }
      } catch(e) {
        console.log(e)
      } finally {
        toast.success('¡Clase cancelada con éxito!', {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setLoading(false)
        setCancelClassModal({ showModal: false, selectedClass: null })
      }
    }
  }

  return (
    <Modal 
      isOpen={props.isOpen} 
      // onOpenChange={props.onOpenChange}
      placement="center"
      onClose={() => setCancelClassModal({ showModal: false, selectedClass: null })}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>
              <h3 className='font-[300]'>Cancelar Clase</h3>
            </ModalHeader>
            <ModalBody>
              <div>
                <p className='leading-6'>
                  Estás seguro que deseas cancelar la clase de <span className='font-bold'>{classType}</span> con <span className='font-bold'>{props.data.selectedClass?.coach}</span> el 
                  <span className='font-bold'> {DateTime.fromISO(props.data.selectedClass?.date!).setLocale('es').toFormat("d 'de' LLLL")} a la(s) {DateTime.fromISO(props.data.selectedClass?.date!).toFormat("t")}</span>?
                </p>
              </div>
              <div className='flex flex-row pt-4 pb-2 justify-end gap-8'>
                <Button style={{ backgroundColor: '#232321', color: 'white' }} onClick={handleClick} isLoading={loading}>
                  Sí, Cancelar Clase
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}