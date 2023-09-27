# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Type.create(name: "Tableware")
Type.create(name: "Knives")
Type.create(name: "Cosmetic")
Type.create(name: "Used clothes from Japan")

Product.create(name: "Nihon Houchou", description: "sharp", price: 200, type_id: 13)
User.find_or_create_by!(email: "asa14151415@gmail.com") do |user|
  user.password = "222222"
end

user_admin = User.find_or_create_by!(email: "asa@gmail.com") do |user|
  user.password = "222222"
end

user_admin.update!(admin: true)
