import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Connect_container from './connect_container'

export default function Home() {
  return (
    <>
      <div>
        <Tabs isFitted variant="enclosed" size="md">
          <TabList mb="5em">
            <Tab>Acceuil</Tab>
            <Tab>News</Tab>

            {/* ________________________________________ */}
            <Connect_container />
            {/* ________________________________________ */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              {/* <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Enable email alerts?
              </FormLabel>
              <Switch id="email-alerts" />
            </FormControl> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  )
}
