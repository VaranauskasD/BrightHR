import { customRender as render } from '../../utils/test'
import { Filter, FilterProps } from './Filter'

let mockFilterProps: FilterProps
describe('Filter', () => {
  beforeEach(() => {
    mockFilterProps = {
      handleChange: () => {},
    }
  })

  it('renders correctly', async () => {
    const { asFragment } = render(<Filter {...mockFilterProps} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
