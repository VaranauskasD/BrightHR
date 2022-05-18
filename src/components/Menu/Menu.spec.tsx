import { customRender as render } from '../../utils/test'
import { Menu, MenuProps } from './Menu'

let mockMenuProps: MenuProps
describe('Menu', () => {
  beforeEach(() => {
    mockMenuProps = {
      handleChange: () => {},
    }
  })

  it('renders correctly', async () => {
    const { asFragment } = render(<Menu {...mockMenuProps} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
