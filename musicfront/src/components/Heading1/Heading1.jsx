import styled from 'styled-components'

export function Heading1({children, ...rest}) {
  return(
    <StyledHeading1 {...rest}>{children}</StyledHeading1>
  )
}

const StyledHeading1 = styled.h1`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
`