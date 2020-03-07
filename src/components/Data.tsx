import React from 'react'
import { Box, Heading, Text, Button, Link, Flex } from '@chakra-ui/core'

import { Card } from './Card'
import { User } from '../@types/data'

interface IDataProps {
  setData: React.Dispatch<React.SetStateAction<{} | User>>
  user: User
}

export const Data: React.FC<IDataProps> = ({ setData, user }) => {
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
          onClick={() => setData({})}
          fontFamily="heading"
          variant="link"
          variantColor="gray.500"
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
