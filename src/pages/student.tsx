import React, { useEffect } from 'react'
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
  ModalFooter,
  List,
  ListItem,
} from '@chakra-ui/core'
import Router from 'next/router'
import NProgress from 'nprogress'

import { Card } from '../components/Card'
import { User } from '../@types/data'

let timeout: any

const start = () => {
  timeout = setTimeout(NProgress.start, 300)
}

const done = () => {
  clearTimeout(timeout)
  NProgress.done()
}

const getStatus = (user: User) => {
  if (
    user?.Status === 'ผ่านการสอบคัดเลือกทั่วไป' ||
    user?.Status === 'ผ่านการสอบคัดเลือก' ||
    user?.Status === 'ผ่านการคัดเลือกเงื่อนไขพิเศษ'
  ) {
    return true
  }

  return false
}

export default ({ user, setRefetch, fetchError }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (user?.ID === '') {
      Router.push('/')
    }
  }, [user])

  if (!user) {
    return <Card> </Card>
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
          {user?.Prefix}
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
          {getStatus(user) ? (
            <Box>
              <Text
                color="green.500"
                fontFamily="heading"
                fontWeight="bold"
                fontSize={['2xl', '3xl']}
              >
                {user?.Status}
              </Text>
              {user?.Rank && (
                <Text
                  color="green.500"
                  fontFamily="heading"
                  fontWeight="bold"
                  fontSize={['xl', '2xl']}
                >
                  ลำดับที่: {user?.Rank}
                </Text>
              )}

              {user.Confirmed ? (
                <Text fontFamily="heading" mt={4} fontWeight="semibold">
                  รายงานตัวและยืนยันเสร็จสิ้น
                </Text>
              ) : (
                <React.Fragment>
                  <Text pt={2} fontSize={['sm', 'md']}>
                    ให้ผู้ผ่านการคัดเลือก กดปุ่มรายงานตัวและยืนยัน <br />
                    ผ่านระบบออนไลน์ ภายในวันและเวลาที่กำหนด <br />
                    หากไม่รายงานตัวถือว่าสละสิทธิ์
                  </Text>

                  <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader fontFamily="heading">
                        รายงานตัวและยืนยัน
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <List styleType="disc">
                          <ListItem>
                            รายงานตัวและยืนยันออนไลน์วันที่ 20 - 27 เมษายน 2563{' '}
                          </ListItem>
                          <ListItem>
                            ชำระเงินค่าบำรุงการศึกษา จำนวน 6,450 บาท
                            ผ่านบัญชีธนาคารกรุงไทย สาขาสยามสแควร์
                            บัญชีกระแสรายวัน ชื่อบัญชีโรงเรียนเตรียมอุดมศึกษา
                            เลขที่บัญชี 052-6-11574-2
                          </ListItem>
                          <ListItem>
                            ส่งรูปภาพหลักฐานการยืนยันและหลักฐานการโอนเงินดังกล่าวที่ ID LINE : vichakarn.tu
                          </ListItem>
                          <ListItem color="red.600">
                            หากไม่รายงานตามวันและเวลาที่กำหนด ถือว่าสละสิทธิ์
                          </ListItem>
                        </List>
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
                                `https://api.announce.triamudom.ac.th:1323/confirm`,
                                {
                                  method: 'POST',
                                  headers: {
                                    'Content-Type': 'application/json',
                                  },
                                  credentials: 'include',
                                }
                              )

                              data = await res.json()
                            } catch (_) {
                              done()
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
          onClick={() => logout()}
          fontFamily="heading"
          variant="link"
          color="gray.800"
        >
          ย้อนกลับ
        </Button>
        {!user.Confirmed && getStatus(user) && (
          <Button
            mt={4}
            fontFamily="heading"
            variantColor="teal"
            onClick={onOpen}
            fontSize={['sm', 'md']}
          >
            รายงานตัวและยืนยัน
          </Button>
        )}
      </Flex>
    </Card>
  )
}

const logout = async () => {
  try {
    await fetch(`https://api.announce.triamudom.ac.th:1323/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
  } finally {
    Router.push('/')
  }
}
