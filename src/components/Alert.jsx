import React from 'react'

export const Alert = (props) => {

    const capitalize = (word)=>{
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

  return (
    <div style={{height:'60px'}}>

    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show transition`} role='alert' style={{transition:'all 0.5s ease'}}>
        <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
    </div>}
    </div>
  )
}
