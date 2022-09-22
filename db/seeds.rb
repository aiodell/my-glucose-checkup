BglEvent.destroy_all
Event.destroy_all
Bgl.destroy_all
User.destroy_all

category = ["fasting", "exercise", "before meal", "after meal", "other"]

puts "seeding database"

puts "creating users..."
 user1 =User.create(
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			username: Faker::Internet.username,
			email: Faker::Internet.safe_email,
			password_digest: Faker::Internet.password(min_length: 8)
		)

 user2 =User.create(
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			username: Faker::Internet.username,
			email: Faker::Internet.safe_email,
			password_digest: Faker::Internet.password(min_length: 8)
		)

 user3 =User.create(
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			username: Faker::Internet.username,
			email: Faker::Internet.safe_email,
			password_digest: Faker::Internet.password(min_length: 8)
		)

puts "seeding bgl data"
puts "this is gonna take a while..."
50.times do
	value = rand(65..185)
	Bgl.create(
		value: value,
		user_id: user1.id
		)
end

30.times do
	value = rand(65..185)
	Bgl.create(
		value: value,
		user_id: user2.id
		)
end

40.times do
	value = rand(65..185)
	Bgl.create(
		value: value,
		user_id: user3.id
		)
end

puts "seeding events"
80.times do
	Event.create(
		comment: Faker::Hipster.sentences(number: 1),
		category: category.sample,
	)
end


85.times do
	BglEvent.create(
		is_high: false,
		is_low: false,
		is_in_range: false,
		bgl_id:  Bgl.all.sample.id,
		event_id: Event.all.sample.id
 	)
end

puts "seeding complete"
