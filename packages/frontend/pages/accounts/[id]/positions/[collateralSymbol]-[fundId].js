import {
  Container,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react'
import Stats from '../../../../components/accounts/Position/Stats'
import Manage from '../../../../components/accounts/Position/Manage'
import Rewards from '../../../../components/accounts/Position/Rewards'
import Pool from '../../../../components/accounts/Position/Pool'

export default function StakingPosition() {
  return (
    <Container>
      <Stats />

      <Tabs isFitted>
        <TabList>
          <Tab>Manage Position</Tab>
          <Tab>Claim Rewards</Tab>
          <Tab>Pool</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Manage />
          </TabPanel>
          <TabPanel>
            <Rewards />
          </TabPanel>
          <TabPanel>
            <Pool />
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Container>
  )
}
