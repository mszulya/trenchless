const App = {
    data() {
        return {
            loading: true,
            info: {
                methods: [],
                sleeveMaterials: [],
                pipeMaterials: [],
                pipeConfigurations: [],
            },
            selectedMethod: null,
            selectedSleeveMaterial: null,
            selectedPipeMaterial: null,
            selectedPipeConfiguration: null,
            activeTab: 0,
            tabs: [
                { name: '1. Method', description: '' },
                { name: '2. Crossings', description: 'SVC ROAD ENV'},
                { name: '3. Sleeve & Pipe Material', description: ''},
                { name: '4. Select the package', description: '⭐⭐⭐ Recomended'}
            ]
        }
    },
    methods: {
        selectMethod(method) {
            this.selectedMethod = method
        },
        selectSleeveMaterial(sleeveMaterial) {
            this.selectedSleeveMaterial = sleeveMaterial
        },
        selectPipeMaterial(material) {
            this.selectedPipeMaterial = material
        },
        selectPipeConfiguration(config) {
            this.selectedPipeConfiguration = config
        }
    },
    watch: {
        async selectedMethod(newMethod) {
            if (newMethod) {
                this.info.pipeMaterials = []
                this.info.pipeConfigurations = []
                this.selectedSleeveMaterial = null
                this.selectedPipeMaterial = null
                this.selectedPipeConfiguration = null
                try {
                    // Fetch sleeve materials based on the selected method ID
                    const response = await axios.get(`https://apidev.borely.com/v1/combinations/methods/${newMethod.id}/sleeve-materials`)
                    this.info.sleeveMaterials = response.data;
                } catch (error) {
                    console.error("Error fetching sleeve materials:", error)
                    alert("Error occurred. Please try again later.")
                }
            }
        },
        async selectedSleeveMaterial(newSleeveMaterial) {
            if (this.selectedMethod && newSleeveMaterial) {
                this.info.pipeConfigurations = []
                try {
                    // Fetch pipe materials based on selected method and sleeve material
                    const response = await axios.get(`https://apidev.borely.com/v1/combinations/methods/${this.selectedMethod.id}/sleeve-materials/${newSleeveMaterial.id}/pipe-materials`)
                    this.info.pipeMaterials = response.data
                } catch (error) {
                    console.error("Error fetching pipe materials:", error)
                    alert("Error occurred. Please try again later.")
                }
            }
        },
        async selectedPipeMaterial(newPipeMaterial) {
            if (this.selectedMethod && this.selectedSleeveMaterial && newPipeMaterial) {
                try {
                    // Fetch pipe configurations based on selected method, sleeve material, and pipe material
                    const response = await axios.get(`https://apidev.borely.com/v1/combinations/methods/${this.selectedMethod.id}/sleeve-materials/${this.selectedSleeveMaterial.id}/pipe-materials/${newPipeMaterial.id}/pipe-configurations`)
                    this.info.pipeConfigurations = response.data
                } catch (error) {
                    console.error("Error fetching pipe configurations:", error)
                    alert("Error occurred. Please try again later.")
                }
            }
        }

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
        pipeButtonClasses() {
            return (pipeMaterial) => {
                if (this.selectedPipeMaterial?.id === pipeMaterial.id) {
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
                if (index === 2) {
                    const descriptions = [this.selectedSleeveMaterial?.name, this.selectedPipeMaterial?.name, this.selectedPipeConfiguration?.name]
                        .filter(Boolean)
                        .join(" ")
                    return { ...tab, description: descriptions }
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
            // Set the first method as the default selection if available
            if (this.info.methods.length > 0) {
                this.selectedMethod = this.info.methods[0]
            }
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
