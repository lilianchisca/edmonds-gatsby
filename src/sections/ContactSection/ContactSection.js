import React from 'react'
import { string } from 'prop-types'

const ContactSection = ({ title, content, formTitle, formId }) => (
  <>
    <h1>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <h2>{formTitle}</h2>
    <h2>{formId}</h2>
  </>
)

ContactSection.propTypes = {
  title: string.isRequired,
  content: string.isRequired,
  formTitle: string.isRequired,
  formId: string.isRequired,
}

export default ContactSection
