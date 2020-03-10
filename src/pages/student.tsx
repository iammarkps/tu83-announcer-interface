import React, { useState, useEffect } from 'react'
import { Spinner, Box, Flex, Button, Text } from '@chakra-ui/core'
import Router from 'next/router'

import { User } from '../@types/data'
import { isEmpty } from '../utils/isEmpty'
import { Card } from '../components/Card'

export default () => {
  const [user, setUser] = useState<User>()
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      let data: any

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
        setFetchError('An error occured')
      }

      setUser(data)
    }

    fetchData()
  }, [])

  if (isEmpty(user)) {
    return (
      <Card>
        <Spinner />
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
          {user.ID}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            ชื่อ:{' '}
          </Box>
          {user.FirstName}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            นามสกุล:{' '}
          </Box>
          {user.LastName}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            ประเภท:{' '}
          </Box>
          {user.ExamType}
        </Text>
        <Text>
          <Box as="span" fontWeight="bold">
            แผนการเรียน:{' '}
          </Box>
          {user.Plan}
        </Text>
        <Box textAlign="center" pt={4}>
          {user.Status ? (
            <Box>
              <Text
                color="green.500"
                fontFamily="heading"
                fontWeight="bold"
                fontSize="3xl"
              >
                ผ่านการสอบคัดเลือก
              </Text>
              <Text
                color="green.500"
                fontFamily="heading"
                fontWeight="bold"
                fontSize="2xl"
              >
                ลำดับที่: {user.Rank}
              </Text>
              <Text pt={2} fontSize="md">
                ให้ผู้มีสิทธิ์เข้าศึกษา รายงานตัวผ่านระบบออนไลน์ <br />
                ภายในวันและเวลาที่กำหนด หากไม่รายงานตัวถือว่าสละสิทธิ์
              </Text>
              <Text
                fontSize="sm"
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
          onClick={async () => {
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
          }}
          fontFamily="heading"
          variant="link"
          color="gray.800"
        >
          ย้อนกลับ
        </Button>
        <Button mt={4} fontFamily="heading" variantColor="teal">
          อ่านประกาศ
        </Button>
      </Flex>
    </Card>
  )
}
