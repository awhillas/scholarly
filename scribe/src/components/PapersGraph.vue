<template>
    <svg :width="width" :height="height">
            <line v-for="(year, i) in axis" 
                :x1="(i+1) * width / axis.length" y1="0" 
                :x2="(i+1) * width / axis.length" :y2="height" 
                class="yearMarker" :key="year" />
            <text v-for="(year, i) in axis" 
                :x="(i+1) * width / axis.length" 
                y="15"
                :key="year" 
                transform="rotate(180,10,10)"
                fill="grey">{{ year }}</text>
    </svg>    
</template>

<script>

export default {
    data() {
        return {
            width: 500,
            height: 500
        }
    },
    computed: {
        papers () { return this.$store.getters.getPapers },
        years() {
            // Sorted list of the years
            if (this.$store.getters.getPapers) {
                return Array.from(new Set(this.$store.state.getPapers.map(p => p.year))).sort()
            }
            return []
        },
        total() {
            return this.axis.length
        },
        axis() {
            if (this.years) {
                let earilest = Math.min(...this.years)
                let range = Math.max(...this.years) - earilest
                return [...Array(range).keys()].map(i => i + earilest - 1)
            }
            return []
        }
    }
}
</script>


<style scoped>
    svg {
        border: 1px dashed black;
    }
    .yearMarker {
        stroke:rgb(0,0,125);
        stroke-width: 1;
    }
</style>