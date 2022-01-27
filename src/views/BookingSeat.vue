<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <div
          class="
            border border-gray-300
            rounded
            text-sm text-center
            py-0.5
            text-gray-500
          "
        >
          Screen
        </div>

        <div class="flex flex-col space-y-4 mt-4">
          <div
            class="col-span-6 flex space-x-8 justify-around"
            v-for="(sides, index) in rows"
            :key="`row-${index}`"
          >
            <div
              v-for="(seats, side) in sides"
              :key="`side-${side}`"
              class="col-span-6 flex space-x-2 justify-around"
            >
              <div
                v-for="(seat, id) in seats"
                :key="`side-${side}-seat-${id}`"
                class="seat"
                :class="{
                  'bg-gray-400': seat.status === 'BOOKED',
                  'cursor-not-allowed': seat.status !== 'AVAILABLE',
                  'cursor-pointer': seat.status === 'AVAILABLE',
                }"
                :title="seat.name"
              >
                {{ seat.name }}
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="3">
        <div class="bg-red-200">a</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const randomStatus = () => ["AVAILABLE", "BOOKED"][Math.round(Math.random())];

export default {
  name: "BookingSeat",
  data: () => ({
    rows: [],
  }),
  beforeMount() {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const sides = ["A", "B"];
    const columns = {
      A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      B: [11, 12, 13, 14, 15, 16, 17, 18],
    };

    for (let row of rows) {
      const seats = {};
      for (let side of sides) {
        for (let column of columns[side]) {
          side in seats || (seats[side] = []);
          seats[side].push({ name: `${row}${column}`, status: randomStatus() });
        }
      }
      this.rows.push(seats);
    }

    console.log(this.rows);
  },
};
</script>
