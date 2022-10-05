BglEvent.destroy_all
Event.destroy_all
Bgl.destroy_all
User.destroy_all

puts "seeding database"

puts "creating users..."
puts "this is gonna take a while..."

User.create([
	{
		first_name: Faker::Name.first_name,
		last_name: Faker::Name.last_name,
		username: Faker::Internet.username,
		email: Faker::Internet.safe_email,
		password: "12345678",
		password_confirmation: "12345678",
		admin: false,
		has_profile: false
	},
	{
		first_name: Faker::Name.first_name,
		last_name: Faker::Name.last_name,
		username: Faker::Internet.username,
		email: Faker::Internet.safe_email,
		password: "12345678",
		password_confirmation: "12345678",
		admin: false,
		has_profile: false
	},
	{
		first_name: Faker::Name.first_name,
		last_name: Faker::Name.last_name,
		username: Faker::Internet.username,
		email: Faker::Internet.safe_email,
		password: "12345678",
		password_confirmation: "12345678",
		admin: false,
		has_profile: false
	}
])

puts "seeding bgl data"
100.times do
	user = User.find(User.pluck(:id).sample)
	value = rand(75..185)
	user.bgls.create(value: value)
end

Event.create([
	{category: "fasting"},
	{category: "after meal"},
	{category: "before meal"},
	{category: "exercise"},
	{category: "other"},
])

puts "seeding events"
Bgl.all.each do |bgl|
	# adding event to the Bgls
	rand(0..2).times do
		event = Event.find(Event.pluck(:id).sample)
		BglEvent.create!(bgl_id: bgl.id, event_id: event.id)
	end
end

puts "seeding complete"
