import {Alert} from 'react-bootstrap'



const Alertmsg = (props) => {
    const msgkey = {
        success: 'success',
        error: 'danger'
    }
    return (
        <Alert variant={msgkey[props.msg]} className="mt-5">
            This is a {props.msg}!!!
        </Alert>
    )
}
export default Alertmsg;