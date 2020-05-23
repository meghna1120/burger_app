import React , {Component} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxi/Auxi' 

const withErrorHandler = (WrappedComponent , axios) => {
    return class extends Component {
        state = {
            error:null
        }

        componentWillMount () {
          this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resInterceptors = axios.interceptors.response.use(res => res,error => {
                this.setState({error: error})
            })
        }

        componentWillUnmount () {
            console.log('Will unmount', this.reqInterceptors , this.resInterceptors)
            //to remove the interceptors which we attached by using this class as hoc for burgerbuilder so when we don
            //need that builder we'll remove these interceptors. use eject for that
            //so that when we use this class for other components also as hoc we don't create more interceptors with the old one 
            //still living
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }
        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render() {
            return (
                <Aux>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            

            )
        }
    }
}

export default withErrorHandler;