import { extendTheme } from "@chakra-ui/react"

export default extendTheme({
    components: {
        Popover: {
            variants: {
                responsive: {
                    popper: {
                        maxWidth: 'unset',
                        width: 'unset'
                    }
                }
            }
        }
    }
});