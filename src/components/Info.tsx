import React from 'react'
import { Box, Button } from '@chakra-ui/core'
import { SimpleImg } from 'react-simple-img'

import { Card } from './Card'

export const Info = ({ setReadInfo }) => (
  <Card p={[4, 8]} mb={[4, 8]}>
    <Button
      mt={4}
      variantColor="teal"
      width="100%"
      fontFamily="heading"
      onClick={() => setReadInfo(true)}
    >
      ต่อไป
    </Button>
  </Card>
)
