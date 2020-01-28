import React from 'react'
import { string } from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import GravityFormForm from 'gatsby-gravityforms-component'

const CONTACTFORM_QUERY = graphql`
  query CONTACTFORM {
    allGfForm {
      edges {
        node {
          formId
          title
          slug
          apiURL
          labelPlacement
          descriptionPlacement
          subLabelPlacement
          formFields {
            id
            label
            labelPlacement
            subLabelPlacement
            description
            descriptionPlacement
            type
            choices
            content
            errorMessage
            inputMaskValue
            isRequired
            visibility
            cssClass
            placeholder
            size
            defaultValue
            maxLength
          }
          button {
            text
          }
          confirmations {
            message
          }
        }
      }
    }
    wpgraphql {
      themeOptions {
        themeOptions {
          address
          directionsLink {
            target
            title
            url
          }
          emailAddress
          phoneNumber
        }
      }
    }
  }
`

const ContactSection = ({
  sectionIndex,
  title,
  content,
  formTitle,
  formId,
}) => {
  const { allGfForm, wpgraphql } = useStaticQuery(CONTACTFORM_QUERY)
  const {
    address,
    directionsLink,
    emailAddress,
    phoneNumber,
  } = wpgraphql.themeOptions.themeOptions

  return (
    <section data-section-index={sectionIndex}>
      <div className="bg-aqua-200">
        <div className="mx-auto max-w-1460 px-30">
          <div className="flex flex-wrap -mx-55 py-110">
            <div className="w-5/12 px-55">
              <h2 className="text-32 mb-35">{title}</h2>
              <div
                className="formcontentblock"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <h3 className="font-normal mb-17 mt-50 text-27">Find us</h3>
              <div
                className="leading-loose text-gray-400 text-16 tracking-body max-w-430 mb-15"
                dangerouslySetInnerHTML={{
                  __html: address
                    .replace(`<strong>Edmonds Accountancy</strong>`, ``)
                    .replace(`<br />`, ``),
                }}
              />
              <div className="mb-40">
                <a
                  rel="noopener noreferrer"
                  href={directionsLink.url}
                  target={directionsLink.target}
                  className="uppercase tracking-button text-14 link-line-shrink text-aqua-500"
                >
                  {directionsLink.title}
                </a>
              </div>
              <footer className="leading-loose text-gray-400 text-16 tracking-body ">
                <p className="flex items-center mb-10">
                  <span className="inline-block min-w-60">Call:</span>
                  <a
                    href={`tel:${phoneNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-aqua-500 link-line-shrink"
                  >
                    {phoneNumber}
                  </a>
                </p>
                <p className="flex items-center">
                  <span className="inline-block min-w-60">Email:</span>
                  <a
                    href={`mailto:${emailAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-aqua-500 link-line-shrink"
                  >
                    {emailAddress}
                  </a>
                </p>
              </footer>
            </div>
            <div className="w-7/12 px-55">
              <div className="bg-white rounded-5 shadow-form py-45 px-55">
                <h2 className="font-normal text-27 mb-45">{formTitle}</h2>
                <GravityFormForm id={formId} formData={allGfForm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

ContactSection.propTypes = {
  sectionIndex: string,
  title: string.isRequired,
  content: string.isRequired,
  formTitle: string.isRequired,
  formId: string.isRequired,
}

export default ContactSection
