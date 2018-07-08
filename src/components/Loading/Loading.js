import React,{Fragment} from 'react';

export default (props) => {
    return <Fragment>
        {props.loading ?
            "Loading" : props.children
        }
    </Fragment>
};