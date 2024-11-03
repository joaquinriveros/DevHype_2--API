import { FC } from "react"

interface IMesaje{
  mesaje: string
}
export const ErrorPage: FC<IMesaje> = ({mesaje}) => {
  return (
    <div style={{backgroundColor: 'var(--primaryBlue-color)', width:'100%', height:'100vh' , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h1 style={{color:'var(--redLite-color)'}}>{mesaje}</h1>
    </div>
  )
}
