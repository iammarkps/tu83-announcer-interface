import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/core'
import Router from 'next/router'
import NProgress from 'nprogress'

import { User } from '../@types/data'
import { Card } from '../components/Card'

let timeout: any

const start = () => {
  timeout = setTimeout(NProgress.start, 300)
}

const done = () => {
  clearTimeout(timeout)
  NProgress.done()
}

export default () => {
  const [user, setUser] = useState<User>()
  const [fetchError, setFetchError] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [refetch, setRefetch] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      let data: any

      start()

      try {
        const res = await fetch(`http://localhost:1323/student`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        data = await res.json()
      } catch (_) {
        done()
        setFetchError('An error occured')
      } finally {
        done()
        setRefetch(false)
      }

      setUser(data)
    }

    if (refetch) {
      fetchData()
    }
  }, [refetch])

  if (!user) {
    return <Card>&nbsp</Card>
  }

  if (fetchError) {
    return (
      <Card>
        <Text>มีข้อผิดพลาดเกิดขึ้น</Text>
      </Card>
    )
  }

  return (
    <Card>
      <Box mt={2} fontSize="lg">
        <Text>
          <Box as="span" fontWeight="bold">
            เลขประจำตัวสอบ:{' '}
          </Box>
          {user?.ID}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            ชื่อ:{' '}
          </Box>
          {user?.FirstName}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            นามสกุล:{' '}
          </Box>
          {user?.LastName}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            ประเภท:{' '}
          </Box>
          {user?.ExamType}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            แผนการเรียน:{' '}
          </Box>
          {user?.Plan}
        </Text>
        <Box textAlign="center" pt={4}>
          {user?.Status ? (
            <Box>
              <Text
                color="green.500"
                fontFamily="heading"
                fontWeight="bold"
                fontSize={['2xl', '3xl']}
              >
                ผ่านการสอบคัดเลือก
              </Text>
              <Text
                color="green.500"
                fontFamily="heading"
                fontWeight="bold"
                fontSize={['xl', '2xl']}
              >
                ลำดับที่: {user.Rank}
              </Text>
              {user.Confirmed ? (
                <Text fontFamily="heading" mt={4} fontWeight="semibold">
                  รายงานตัวเสร็จสิ้น
                </Text>
              ) : (
                <React.Fragment>
                  <Text pt={2} fontSize={['sm', 'md']}>
                    ให้ผู้มีสิทธิ์เข้าศึกษา รายงานตัวผ่านระบบออนไลน์ <br />
                    ภายในวันและเวลาที่กำหนด หากไม่รายงานตัวถือว่าสละสิทธิ์
                  </Text>

                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader fontFamily="heading">
                        ยืนยันสิทธิ์เข้าศึกษาต่อ
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        เมื่อยืนยันสิทธิ์แล้ว จะไม่สามารถเปลี่ยนแปลงได้
                        โดยหากนักเรียนมีความประสงค์จะเข้าศึกษาต่อ
                        นักเรียนต้องยืนยันสิทธิ์ภายในวันที่ 15 มีนาคม 2563
                      </ModalBody>
                      <ModalFooter fontFamily="heading">
                        <Button variant="ghost" mr={3} onClick={onClose}>
                          ปิด
                        </Button>
                        <Button
                          variantColor="pink"
                          onClick={async () => {
                            let data: any

                            start()

                            try {
                              const res = await fetch(
                                `http://localhost:1323/confirm`,
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  credentials: 'include'
                                }
                              )

                              data = await res.json()
                            } catch (_) {
                              done()
                              setFetchError('An error occured')
                            } finally {
                              done()
                            }

                            if (data) {
                              setRefetch(true)
                            }
                          }}
                        >
                          ยืนยันสิทธิ์
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </React.Fragment>
              )}
              <Text
                fontSize={['xs', 'sm']}
                color="gray.500"
                wordBreak="normal"
                pt={4}
                fontFamily="heading"
                fontWeight="semibold"
                fontStyle="italic"
              >
                "โรงเรียนของเรามีประวัติงดงามมานานแล้ว
                <br />
                และหวังว่าประวัตินี้จะตกทอดมาถึงพวกเธอ
                <br />
                และเธอจะรับไว้มิให้เสื่อมเสีย” <br />— ฯพณฯ ศาสตราจารย์
                หม่อมหลวงปิ่น มาลากุล
              </Text>
            </Box>
          ) : (
            <Text
              color="red.400"
              fontFamily="heading"
              fontWeight="bold"
              fontSize="2xl"
            >
              ไม่ผ่านการสอบคัดเลือก
            </Text>
          )}
        </Box>
      </Box>
      <Flex direction="row" justify="space-between" align="flex-end" pt={2}>
        <Button
          mt={4}
          onClick={() => logout(setFetchError)}
          fontFamily="heading"
          variant="link"
          color="gray.800"
        >
          ย้อนกลับ
        </Button>
        {!user.Confirmed && (
          <Button
            mt={4}
            fontFamily="heading"
            variantColor="teal"
            onClick={onOpen}
          >
            รายงานตัว
          </Button>
        )}
      </Flex>
    </Card>
  )
}

const logout = async (
  setFetchError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    await fetch(`http://localhost:1323/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
  } catch (_) {
    setFetchError('An error occured')
  } finally {
    Router.push('/')
  }
}
