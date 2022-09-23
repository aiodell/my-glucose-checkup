BglEvent.destroy_all
Event.destroy_all
Bgl.destroy_all
User.destroy_all

category = ["fasting", "exercise", "before meal", "after meal", "other"]

puts "seeding database"

puts "creating users..."
puts "this is gonna take a while..."
 user1 =User.create(
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			username: Faker::Internet.username,
			email: Faker::Internet.safe_email,
			password: "123",
			password_confirmation:"123"
		)

 user2 =User.create(
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			username: Faker::Internet.username,
			email: Faker::Internet.safe_email,
			password: "123",
			password_confirmation: "123"
		)

 user3 =User.create(
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			username: Faker::Internet.username,
			email: Faker::Internet.safe_email,
			password:"123",
			password_confirmation: "123"
		)

puts "seeding bgl data"

bgl1 = user1.bgls.create(
	value: rand(75..185)
)

bgl2 = user1.bgls.create(
	value: rand(75..185)
)

bgl3 = user1.bgls.create(
	value: rand(75..185)
)

bgl3.events.create(
	comment: Faker::Hipster.sentence(word_count: 3),
	category: category.sample
)

bgl3.events.create(
	comment: Faker::Hipster.sentence(word_count: 3),
	category: category.sample
)


bgl2.events.create(
	comment: Faker::Hipster.sentence(word_count: 3),
	category: category.sample
)


bgl1.events.create(
	comment: Faker::Hipster.sentence(word_count: 3),
	category: category.sample
)



puts "seeding complete"
