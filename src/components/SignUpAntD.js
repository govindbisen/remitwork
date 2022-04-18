import React, { useState, useEffect } from 'react'
import moment from 'moment'

import 'antd/dist/antd.css'
import {
  DatePicker,
  Radio,
  Space,
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  Card,
  Row,
  Col,
  Divider,
  Select,
} from 'antd'
import useFetch from '../useFetch'
const { Option } = Select
const style = { background: 'yellow', padding: '8px 0' }

export default function SignUpAntD() {
  //Sending country api......
  const [sendingCountryList, setSendingCountryList] = useState('')
  const fetchCountryList = async () => {
    const fetchedResponse = await fetch(
      'https://qaone.remit.in/services/usr/sending-country-lists',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: '1452',
          requestType: 'SENDCOUNTRYLIST',
          channelId: 'WEB',
          clientId: 'IUK',
          groupId: 'IUK',
          sessionId: '5RC0BY7ckyCV9JL0_xgg_HCkwMmUQUSsvzjYPzRk',
          ipAddress: '127.0.0.1',
        }),
      },
    )
    const data = await fetchedResponse.json()
    setSendingCountryList(data.responseData)
  }
  useEffect(() => {
    try {
      fetchCountryList()
    } catch (error) {
      console.log(error)
    }
  }, [])

  // console.log(sendingCountryList)
  const [countryFrom, setCountryFrom] = useState('')
  const handleSelectCountryFrom = (event) => {
    setCountryFrom(event.target.value)
  }
  let countryList =
    sendingCountryList.length > 0 &&
    sendingCountryList.map((item, i) => {
      return (
        <Option key={i} value={item.sendCountry}>
          {item.countryName}
        </Option>
      )
    })
  //......

  // Country Code ...

  const [phoneCountryCodeList, setPhoneCountryCodeList] = useState('')
  const fetchCountryCodeList = async () => {
    const fetchedResponse = await fetch(
      'https://qaone.remit.in/services/usr/country-phone-codes',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: '1452',
          requestType: 'SENDCOUNTRYLIST',
          channelId: 'WEB',
          clientId: 'IUK',
          groupId: 'IUK',
          sessionId: '5RC0BY7ckyCV9JL0_xgg_HCkwMmUQUSsvzjYPzRk',
          ipAddress: '127.0.0.1',
        }),
      },
    )
    const data = await fetchedResponse.json()
    setPhoneCountryCodeList(data.responseData)
  }
  useEffect(() => {
    try {
      fetchCountryCodeList()
      //   console.log(phoneCountryCodeList) // here
    } catch (error) {
      console.log(error)
    }
  }, [])

  let countryCodeList =
    phoneCountryCodeList.length > 0 &&
    phoneCountryCodeList.map((item, i) => {
      return (
        <Option value={item.countryPhoneCode}>{item.countryPhoneCode}</Option>
      )
    })

  //   const [countryCode, setCountryCode] = useState('')
  //   const handleSelectCountryCode = (event) => {
  //     setCountryCode(event.target.value)
  //   }
  //

  // custom hook
  //   const data = useFetch({ 'https://qaone.remit.in/services/usr/save-leads',})

  const [form] = Form.useForm()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    try {
      ;(async function submitApi() {
        const response = await fetch(
          'https://qaone.remit.in/services/usr/save-leads',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: values.firstname,
              lastName: values.lastname,
              loginId: values.email,
              emailId: values.email,
              mobilePhoneCode: values.countrycode,
              mobileNo: values.mobilenumber,
              sendCountry: values.sendingMoneyFrom,
              dob: moment(values.dob).format('YYYY-MM-DD'),
              groupId: 'XR',
              channelId: 'WEB',
              clientId: 'XR',
              requestId: '1452',
              sessionId: '123456',
              requestType: 'LEAD',
              ipAddress: '127.0.0.1',
              custType: 'INDIVITUAL',
              otpFlag: 'N',
              periodicUpdate: 'N',
              twofa: 'N',
              marketingCommunication: '~EMAIL`SMS`SOCIAL_MEDIA~CALL~',
              pageReferer: 'savsa',
            }),
          },
        )
        const data = await response.json()
        console.log('response data after sign up =>', data)
      })()
    } catch (error) {
      console.log(error)
    }
    console.log(
      'date format',
      JSON.stringify(moment(values.dob).format('yyyymmdd')),
    )
  }

  function onChange(date, dateString) {
    console.log(date, dateString)
  }
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={true}>Image</Card>
      </Col>
      <Col span={12}>
        <Card title="SIGN UP" bordered={true}>
          <Form
            layout="vertical"
            colon={false}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ['zhejiang', 'hangzhou', 'xihu'],
              prefix: '86',
            }}
            scrollToFirstError
          >
            <Form.Item
              name="sendingMoneyFrom"
              label={
                <div style={{ fontSize: '.8rem' }}>Sending Money from</div>
              }
              rules={[
                {
                  message:
                    'Please Select the country you want to send money from.',
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select a country"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {/* <Option value="USA">USA</Option>
                <Option value="RUSSIA">RUSSIA</Option>
                <Option value="INDIA">INDIA</Option> */}
                {countryList}
              </Select>
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                {' '}
                <Form.Item
                  name="firstname"
                  label="First Name"
                  tooltip="Please Enter your first name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your first name',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Please input your first name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                {' '}
                <Form.Item name="middlename" label="Middle Name">
                  <Input placeholder="Please input your middle name" />
                </Form.Item>
              </Col>
              <Col span={8}>
                {' '}
                <Form.Item
                  name="lastname"
                  label="Last Name"
                  tooltip="Please input your last name."
                  rules={[
                    {
                      required: true,
                      message: 'Please input your last name',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Please input your last name" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="gender"
              label="Gender"
              tooltip="Please select your gender"
              rules={[
                {
                  required: true,
                  message: 'Please select your gender',
                  whitespace: true,
                },
              ]}
            >
              <Radio.Group>
                <Radio value={'male'}>Male</Radio>
                <Radio value={'female'}>Female</Radio>
              </Radio.Group>
            </Form.Item>
            <Row gutter={16}>
              <Col span={8}>
                {' '}
                <Form.Item
                  name="countrycode"
                  label="Country Code"
                  rules={[
                    {
                      required: true,
                      message: 'Please Select the country code',
                    },
                  ]}
                >
                  <Select showSearch placeholder="Select a country code">
                    {/* <Option key="1" value="1 USA">
                      1 USA
                    </Option>
                    <Option key="2" value="7 RUSSIA">
                      7 RUSSIA
                    </Option>
                    <Option key="3" value="91 INDIA">
                      91 INDIA
                    </Option> */}
                    {countryCodeList}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}>
                {' '}
                <Form.Item
                  name="mobilenumber"
                  label="Mobile Number"
                  tooltip="Please Enter your Mobile Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Mobile Number',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input placeholder="Please input your Mobile Number" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="dob"
              label="Date of Birth"
              //   rules={[
              //     {
              //       required: true,
              //       message: 'Please select your date of birth',
              //       whitespace: true,
              //     },
              //   ]}
            >
              <DatePicker
                style={{
                  width: '100%',
                }}
                onChange={onChange}
                picker="date"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail Address"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="hearaboutus"
              label="How did you hear about us?"
              rules={[
                {
                  required: true,
                  message: 'How did you hear about us?',
                },
              ]}
            >
              <Select showSearch placeholder="How did you hear about us?">
                <Option value="Internet">Internet</Option>
                <Option value="Newspaper">Newspaper</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
            >
              <Checkbox>
                By clicking on the "Register Me" button below, I agree to the
                Terms and Conditions of KCB Remit.
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Verify with otp
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}
