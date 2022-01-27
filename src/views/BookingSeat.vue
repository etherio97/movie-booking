<template>
  <v-container>
    <StripeCheckout
      :pk="$root.config.STRIPE_PUBLISHER_KEY"
      ref="checkoutRef"
      mode="payment"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
    />

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
                @click="selectSeat(seat)"
                :key="`side-${side}-seat-${id}`"
                class="seat"
                :class="{
                  'text-white': seat.selected,
                  'font-bold': seat.selected,
                  'bg-gray-300': seat.selected,
                  'bg-gray-400': seat.status === 'TAKEN',
                  'cursor-not-allowed': seat.status !== 'AVAILABLE',
                  'cursor-pointer': seat.status === 'AVAILABLE',
                  'hover:bg-gray-300': seat.status === 'AVAILABLE',
                }"
                :title="seat.name"
              >
                {{ seat.name }}
              </div>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="3" class="space-y-4">
        <v-card>
          <v-card-title>{{ movie.title }}</v-card-title>
          <v-card-subtitle>Selected Seats</v-card-subtitle>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Seat Name</th>
                    <th class="text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(seat, i) in selectedSeats"
                    :key="`selected-seat-${i}`"
                  >
                    <td>{{ seat.name }}</td>
                    <td>{{ seat.price.toLocaleString() }} Kyats</td>
                  </tr>
                  <tr class="font-bold">
                    <td>Total</td>
                    <td>{{ total.toLocaleString() }} Kyats</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="checkout()"> Checkout </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import movies from "../data/movies";
import { StripeCheckout } from "@vue-stripe/vue-stripe";

const randomStatus = () => ["AVAILABLE", "TAKEN"][Math.round(Math.random())];

export default {
  name: "BookingSeat",
  components: {
    StripeCheckout,
  },
  data: () => ({
    movie: {},
    rows: [],
    selectedSeats: [],
    maxSeats: 20,
    lineItems: [
      {
        price: "price_1KMSXhCjyeCftlPgpRV1wmX1",
        quantity: 0,
      },
    ],
    successURL: location.protocol + "//" + location.host,
    cancelURL: location.href,
  }),
  computed: {
    total() {
      return this.selectedSeats.reduce((r, v) => r + v.price, 0);
    },
  },
  methods: {
    checkout() {
      console.log("checkout");
      if (this.lineItems[0].quantity === 0) return;
      console.log(this.$refs.checkoutRef);
      this.$refs.checkoutRef.redirectToCheckout();
    },
    selectSeat(seat) {
      if (seat.status !== "AVAILABLE") return;
      if (seat.selected) {
        let i = this.selectedSeats.findIndex((s) => s.name === seat.name);
        seat.selected = false;
        this.lineItems[0].quantity--;
        return this.selectedSeats.splice(i, 1);
      }
      if (this.maxSeats === this.selectedSeats.length) {
        return console.warn("maximun seats is reached");
      }
      seat.selected = true;
      this.lineItems[0].quantity++;
      this.selectedSeats.push(seat);
    },
  },
  beforeMount() {
    this.movie = movies.find((m) => m.id == this.$route.params.id);
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const sides = ["A", "B"];
    const columns = {
      A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      B: [11, 12, 13, 14, 15, 16, 17, 18],
    };
    const pricing = {
      A: 7000,
      B: 7000,
      C: 7000,
      D: 7000,
      E: 9000,
      F: 9000,
      G: 9000,
      H: 9000,
      I: 9000,
    };

    for (let row of rows) {
      const seats = {};
      for (let side of sides) {
        for (let column of columns[side]) {
          side in seats || (seats[side] = []);
          seats[side].push({
            name: `${row}${column}`,
            status: randomStatus(),
            price: pricing[row],
            selected: false,
          });
        }
      }
      this.rows.push(seats);
    }
  },
};
</script>
