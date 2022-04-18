import React, { useEffect, useState } from 'react'
import './signup.css'
import { Select } from 'antd'
const { Option } = Select

export default function Signup() {
  //-------------Sending Country List---------------------------------------------------------------------------
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
        <option key={i} value={item.sendCountry}>
          {item.countryName}
        </option>
      )
    })
  //----------------------------------------------------------------------------------------

  const [fName, setFname] = useState('')
  const [mName, setMname] = useState('')
  const [lName, setLname] = useState('')

  const [gender, setGender] = useState('female')

  // Country Code -------------------------------------------------------------------------

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
      console.log(phoneCountryCodeList) // here
    } catch (error) {
      console.log(error)
    }
  }, [phoneCountryCodeList])

  useEffect(() => {
    console.log(phoneCountryCodeList)
  }, [phoneCountryCodeList])

  let countryCodeList =
    phoneCountryCodeList.length > 0 &&
    phoneCountryCodeList.map((item, i) => {
      return (
        <option key={i} value={item.countryPhoneCode}>
          {item.countryPhoneCode}
        </option>
      )
    })

  const [countryCode, setCountryCode] = useState('')
  const handleSelectCountryCode = (event) => {
    setCountryCode(event.target.value)
  }
  //----------------------------------------------------------------------------------------

  const [mobileNumber, setMobileNumber] = useState('')

  const [dob, setDob] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [hearAboutUs, setHearAboutUs] = useState('')
  const handleHearAboutUs = (e) => {
    setHearAboutUs(e.target.value)
  }

  const [termConditionisChecked, setTermConditionisChecked] = useState(false)
  const handleSetTermConditionisChecked = () => {
    setTermConditionisChecked(!termConditionisChecked)
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()
    const formValues = {
      countryFrom,
      fName,
      lName,
      mName,
      gender,
      countryCode,
      mobileNumber,
      dob,
      email,
      password,
      confirmPassword,
      hearAboutUs,
      termConditionisChecked,
    }

    console.log('form submitted!!', formValues)
    setformErrors(validate(formValues))

    try {
      ;(async function submitApi() {
        const response = await fetch(
          'https://qaone.remit.in/services/usr/save-leads',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              firstName: fName,
              lastName: lName,
              loginId: email,
              emailId: email,
              mobilePhoneCode: countryCode,
              mobileNo: mobileNumber,
              sendCountry: countryFrom,
              dob: dob,
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
  }

  const [formErrors, setformErrors] = useState({})
  const validate = (values) => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    const errors = {}
    if (!values.countryFrom) {
      errors.countryFrom = 'Country you are sending money from is required.'
    }
    if (!values.fName) {
      errors.fName = 'First name is required.'
    }
    if (!values.lName) {
      errors.lName = 'Last name is required.'
    }
    if (!values.countryCode) {
      errors.countryCode = 'Country Code is required.'
    }
    if (!values.mobileNumber) {
      errors.mobileNumber = 'Mobile number is required.'
    }
    if (!values.dob) {
      errors.dob = 'Date of birth is required.'
    }
    if (!values.email) {
      errors.email = 'email is required.'
    } else if (!regex.test(values.email)) {
      errors.email = 'please enter valid email.'
    }
    if (!values.password) {
      errors.password = 'Password is required.'
    } else if (values.password !== values.confirmPassword) {
      errors.password = 'Password and confirm password should be same.'
    }
    if (!values.hearAboutUs) {
      errors.hearAboutUs = 'Please select how did you here about us.'
    }
    return errors
  }

  return (
    <>
      <div className="container">
        <div className="left"> image </div>
        <div className="right">
          {' '}
          <h2>Sign up</h2>
          <form onSubmit={formSubmitHandler}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label>Sending Money from</label>
              {/* <Select
                defaultValue="lucy"
                style={{ width: 120 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select> */}

              <select value={countryFrom} onChange={handleSelectCountryFrom}>
                {countryList}
                {/* {sendingCountryList.map((country,i) => (
                  <option key={i} value={country.sendCountry}>{country.countryName}</option>
                ))} */}
                {/* <option value="US">United States of America</option>
                <option value="RU">Russia</option>
                <option value="IN">India</option> */}
              </select>
              {<div style={{ color: 'red' }}>{formErrors.countryFrom} </div>}
            </div>
            <div style={{ display: 'flex' }}>
              <div className="name">
                <label>First Name</label>
                <input
                  type="text"
                  value={fName}
                  onChange={(e) => setFname(e.target.value)}
                ></input>
                {<div style={{ color: 'red' }}>{formErrors.fName} </div>}
              </div>
              <div className="name">
                <label>Middle Name</label>
                <input
                  type="text"
                  value={mName}
                  onChange={(e) => setMname(e.target.value)}
                ></input>
              </div>
              <div className="name">
                {' '}
                <label>Last Name</label>
                <input
                  type="text"
                  value={lName}
                  onChange={(e) => setLname(e.target.value)}
                ></input>
                {<div style={{ color: 'red' }}>{formErrors.lName} </div>}{' '}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label> Gender </label>
              <div>
                {' '}
                Male
                <input
                  type="radio"
                  checked={gender === 'male'}
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
                <input
                  type="radio"
                  checked={gender === 'female'}
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label>Country Code</label>
                <select value={countryCode} onChange={handleSelectCountryCode}>
                  {countryCodeList}
                  {/* <option value="1">1</option>
                <option value="7">7</option>
                <option value="91">91</option> */}
                </select>
              </div>
              {<div style={{ color: 'red' }}>{formErrors.countryCode} </div>}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <label>Mobile number</label>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
              {<div style={{ color: 'red' }}>{formErrors.mobileNumber} </div>}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <label>Date of birth</label>
              <input
                type="date"
                onChange={(e) => setDob(e.target.value)}
                value={dob}
              />
            </div>
            {<div style={{ color: 'red' }}>{formErrors.dob} </div>}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <label>email</label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {<div style={{ color: 'red' }}>{formErrors.email} </div>}
            <div className="label-input">
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="label-input">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {<div style={{ color: 'red' }}>{formErrors.password} </div>}
            <div className="label-input">
              <label>How did you hear about us?</label>
              <select value={hearAboutUs} onChange={handleHearAboutUs}>
                <option value="Internet">Internet</option>
                <option value="NewsPaper">NewsPaper</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {<div style={{ color: 'red' }}>{formErrors.hearAboutUs} </div>}

            <div>
              <input
                type="checkbox"
                checked={termConditionisChecked}
                onChange={handleSetTermConditionisChecked}
              />
              By clicking on the "Register Me" button below, I agree to the
              Terms and Conditions of KCB Remit.
            </div>

            {!termConditionisChecked && (
              <p style={{ color: 'red' }}> Please read terms and conditions.</p>
            )}
            <div className="label-input">
              <button>Verify with OTP</button>
            </div>
          </form>{' '}
        </div>
      </div>
    </>
  )
}
