<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(4, true),
            'author' => $this->faker->name(),
            'genre' => $this->faker->text(6),
            'description' => $this->faker->sentence(30, true),
            'isbn' => $this->faker->regexify('[0-9]{13}'),
            'image' => null,
            'published' => $this->faker->date('Y-m-d', now()->addYears(2)),
            'publisher' => $this->faker->name(),
        ];
    }
}
