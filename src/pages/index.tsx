import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  Icon,
  Text
} from '@chakra-ui/core'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import Router from 'next/router'

import { Card } from '../components/Card'

const LoginSchema = Yup.object().shape({
  id: Yup.string().required('โปรดกรอกเลขที่นั่งสอบ'),

  ctz_id: Yup.string().required('โปรดกรอกเลขประจำตัวประชาชน / Passport Number')
})

export default ({ setRefetch }) => {
  const [fetchError, setFetchError] = useState('')

  return (
    <Card>
      <Heading size="md">ประกาศผลการสอบคัดเลือก</Heading>
      <Box mt={2} fontFamily="heading">
        <Formik
          initialValues={{ id: '', ctz_id: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, actions) => {
            let data: any

            actions.setSubmitting(true)
            try {
              const res = await fetch(
                `https://api.announce.triamudom.ac.th:1323/login`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(values),
                  credentials: 'include'
                }
              )

              data = await res.json()
            } catch (_) {
              setFetchError('An error occured')
            }

            if (data !== 'Unauthorized') {
              setRefetch(true)
              Router.push('/student')
            } else {
              setFetchError(
                'เลขที่นั่งสอบ หรือ เลขบัตรประจำตัวประชาชน/เลขพาสปอร์ต ไม่ถูกต้อง'
              )
            }

            actions.setSubmitting(false)
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <Field name="id">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.id && form.touched.id}>
                    <FormLabel htmlFor="id">เลขที่นั่งสอบ</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        children={<Icon name="edit" color="gray.300" />}
                      />
                      <Input {...field} id="id" />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="ctz_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.phone && form.touched.phone}
                    mt={4}
                  >
                    <FormLabel htmlFor="ctz_id">
                      เลขบัตรประจำตัวประชาชน / Passport Number
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        children={<Icon name="edit" color="gray.300" />}
                      />
                      <Input {...field} id="ctz_id" />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                variantColor="teal"
                isLoading={props.isSubmitting}
                type="submit"
                width="100%"
                fontFamily="heading"
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          )}
        </Formik>
        <Text color="red.500" mt={4}>
          {fetchError}
        </Text>
      </Box>
    </Card>
  )
}
