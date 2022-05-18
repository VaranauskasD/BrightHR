import { customRender as render } from '../../utils/test'
import { Filter } from './Filter'

describe('Filter', () => {
  it('renders correctly', async () => {
    const { asFragment } = render(<Filter />)
    expect(asFragment()).toMatchSnapshot()
  })
})
