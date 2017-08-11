import React from 'react'
import { ActionCellRender } from 'components/ServiceManagementList/ActionCellRender'

describe('(Component) ActionCellRender', () => {
  it('render normally', () => {
    const data = {
      'id': '1'
    }
    const wrapper = shallow(
      <ActionCellRender data={data} />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
