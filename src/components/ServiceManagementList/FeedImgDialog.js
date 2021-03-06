import React from 'react'
import classes from './Dialog.scss'
import { Button, Dialog, Checkbox } from '@blueprintjs/core'
import { connect } from 'react-redux'
const qca = __QCA__

type Props = {
  id: Number,
  kernelId: Number,
  isOpen: boolean,
  toggleDialog: Function,
  token: String
};

export class FeedImgDialog extends React.Component {
  props: Props;

  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEnabledChange = this.handleEnabledChange.bind(this)
    this.state = {
      isContinuous: false,
      pic: ''
    }
  }

  handleSubmit () {
    console.log('handle FeedImage')
    let tmp = []
    if (this.state.pic === 'CSOT图片') {
      tmp = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg']
    } else {
      tmp = [
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457001.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457002.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457003.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457004.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457005.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457006.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457007.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457008.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457009.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457010.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457011.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457012.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457013.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457014.jpg',
        '1F950_T5A471B012B_TCAOH110_68_-624.127_824.558_O_M_20170612_0457015.jpg'
      ]
    }
    let url = `${qca}/ojs/kernel/action`
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.props.token
      },
      method: 'POST',
      body: JSON.stringify({
        'kernelId': this.props.kernelId.toString(),
        'cmd': 'feed',
        'payload': tmp,
        isContinuous: this.state.isContinuous
      })
    })
      .then(res => res.json())
      .then(data => {

      })
    this.props.toggleDialog()
  }

  handleEnabledChange () {
    this.setState({
      isContinuous: !this.state.isContinuous
    })
  }

  handleChange (type) {
    return (e) => {
      this.setState({ [type]: e.target.value })
    }
  }

  render () {
    console.log('state', this.state.pic)
    return (
      <div className={classes['Dialog-container']}>
        <Dialog
          isOpen={this.props.isOpen}
          onClose={this.props.toggleDialog}
          className={classes.dialog}
        >
          <div className={classes.header}>
            <h6 className={classes.headerTitle}>{'Feed Image来源'}( ID {this.props.id})</h6>
          </div>
          <div className={classes.dialogBody}>
            <br />
            <label className={`pt-label pt-inline ${classes.filter}`}
              style={{paddingLeft: '80px'}}>
              图片类型
              <div className='pt-select'>
                {(() => {
                  return (
                    <select className={classes.select}
                      onChange={this.handleChange('pic')}>
                      <option value=''>请选择</option>
                      <option value='CSOT图片'>CSOT图片</option>
                      <option value='焊锡检测图片'>焊锡检测图片</option>
                    </select>
                  )
                })()}
              </div>
            </label>
            <div className={classes.btnGroup}>
              <Checkbox
                checked={this.state.isContinuous}
                className={classes.isContinuous}
                onChange={this.handleEnabledChange}>
                重复循环
              </Checkbox>
              <Button className={classes.btnCancel} onClick={this.props.toggleDialog}>
                {_.CANCEL}
              </Button>
              <Button className={`pt-button pt-intent-primary ${classes.btnEdit}`} onClick={this.handleSubmit}>
                {_.OK}
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}
export default connect(
  (state) => ({
    token: state.auth.token
  }),
  (dispatch, state) => {
    return {
      dispatch
    }
  }
)(FeedImgDialog)
