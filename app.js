const App = {
    data() {
        return {
            loading: true,
            info: {
                methods: [],
            },
            selectedMethod: null,
            activeTab: 0,
            tabs: [
                { name: '1. Method', description: '' },
                { name: '2. Crossings', description: 'SVC ROAD ENV'},
                { name: '3. Sleeve & Pipe Material', description: 'No Sleeve Jacking Single Concrete'},
                { name: '4. Select the package', description: '⭐⭐⭐ Recomended'}
            ]
        }
    },
    methods: {
        selectMethod(method) {
            this.selectedMethod = method
        },
    },
    computed: {
        methodButtonClasses() {
            return (method) => {
                if (this.selectedMethod?.id === method.id) {
                    return 'text-orange-600 border-orange-500 bg-orange-100'
                }
                return 'text-gray-600 border-gray-300 bg-white'
            }
        },
        updatedTabs() {
            return this.tabs.map((tab, index) => {
                if (index === 0 && this.selectedMethod) {
                    return { ...tab, description: this.selectedMethod.name }
                }
                return tab
            })
        },
    },
    async mounted() {
        try {
            // Fetches data from the API when the component is mounted
            // This is an asynchronous operation
            const response = await axios.get("https://apidev.borely.com/v1/methods")
                this.info.methods = response.data // Updates the `methods` array with data from the API
        } catch (error) {
            // Logs the error to the console and shows an alert if the API request fails
            console.error("Error fetching methods:", error)
            alert("Error occurred. Please try again later.")
        } finally {
            // Ensures the `loading` state is set to false
            this.loading = false
        }
    }
}

Vue.createApp(App).mount('#app')
