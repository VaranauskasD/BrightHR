import { screen } from '@testing-library/react'

import { customRender as render } from '../../utils/test'
import { Menu } from './Menu'

describe('Menu', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<Menu />)
    expect(asFragment()).toMatchSnapshot()
  })
})
