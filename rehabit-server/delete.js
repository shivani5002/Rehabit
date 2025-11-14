require('dotenv').config();
const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  habitName: { type: String, required: true },
  description: String,
  startDate: String,
  frequency: { type: String, required: true },
  category: String,
  reminderEnabled: Boolean,
  reminderTime: String,
});

const Habit = mongoose.model('Habit', HabitSchema);

async function deleteAllHabits() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const result = await Habit.deleteMany({});
    console.log(`Deleted ${result.deletedCount} habits`);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error during deletion:", err);
  }
}

deleteAllHabits();
