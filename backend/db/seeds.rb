Company.destroy_all
Product.destroy_all

departments = Department.all
cities_by_department = City.all.group_by(&:department_id)

companies_data = [
  { name: "AgroAndes S.A.", category: "Agricultura", phone: "3001234567", address: "Calle 12 #45-67", assets: 1_200_000.00, liabilities: 350_000.00 },
  { name: "Constructora El Roble", category: "Construcción", phone: "3105553322", address: "Av. Central 100", assets: 2_500_000.00, liabilities: 1_000_000.00 },
  { name: "Distribuciones La 14", category: "Comercio", phone: "3152221122", address: "Carrera 8 #15-90", assets: 980_000.00, liabilities: 210_000.00 },
  { name: "Servicios Omega", category: "Servicios", phone: "3187773344", address: "Calle 23 #18-44", assets: 760_000.00, liabilities: 150_000.00 },
  { name: "Industria Metalúrgica Norte", category: "Manufactura", phone: "3018887766", address: "Zona Industrial Km 4", assets: 5_000_000.00, liabilities: 2_000_000.00 },
  { name: "Transporte y Logística Andes", category: "Transporte", phone: "3046661122", address: "Calle 50 #30-10", assets: 1_700_000.00, liabilities: 450_000.00 },
  { name: "BioSalud Natural", category: "Salud", phone: "3023456789", address: "Carrera 10 #20-30", assets: 540_000.00, liabilities: 120_000.00 },
  { name: "Educativa Futuro", category: "Educación", phone: "3176543210", address: "Calle 60 #10-25", assets: 1_100_000.00, liabilities: 400_000.00 },
  { name: "Tecnología Nova", category: "Tecnología", phone: "3009008000", address: "Parque Tecnológico, Torre 3", assets: 3_500_000.00, liabilities: 1_500_000.00 },
  { name: "Energía Viva S.A.", category: "Energía", phone: "3112223344", address: "Carrera 70 #45-12", assets: 4_800_000.00, liabilities: 2_000_000.00 },
  { name: "Café de Altura", category: "Agricultura", phone: "3121112233", address: "Finca La Esperanza", assets: 920_000.00, liabilities: 200_000.00 },
  { name: "Aceros del Sur", category: "Manufactura", phone: "3134445566", address: "Cra 80 #20-50", assets: 6_000_000.00, liabilities: 3_000_000.00 },
  { name: "Consultoría Estrategika", category: "Servicios", phone: "3198765432", address: "Calle 100 #7-30", assets: 850_000.00, liabilities: 250_000.00 },
  { name: "Red de Clínicas Vital", category: "Salud", phone: "3052233445", address: "Av. del Río #90-20", assets: 4_000_000.00, liabilities: 1_800_000.00 },
  { name: "Grupo EcoLimpio", category: "Servicios", phone: "3204433221", address: "Cra 33 #44-55", assets: 430_000.00, liabilities: 90_000.00 },
  { name: "Panadería Don Pan", category: "Alimentos", phone: "3142233445", address: "Calle 4 #3-21", assets: 290_000.00, liabilities: 50_000.00 },
  { name: "Aventura Tours", category: "Turismo", phone: "3167891234", address: "Calle 8 #40-40", assets: 650_000.00, liabilities: 200_000.00 },
  { name: "Centro Comercial Nova", category: "Comercio", phone: "3189988776", address: "Av. Principal #33-33", assets: 8_000_000.00, liabilities: 4_500_000.00 },
  { name: "Inversiones Rivera", category: "Finanzas", phone: "3071112233", address: "Cra 45 #99-01", assets: 2_300_000.00, liabilities: 800_000.00 },
  { name: "Soluciones Digitales", category: "Tecnología", phone: "3091234567", address: "Zona Franca Ed. 2", assets: 2_900_000.00, liabilities: 900_000.00 }
]

product_names = [
  "Producto Estrella", "Solución Integral", "Paquete Premium", "Kit Básico", "Servicio Express",
  "Línea Profesional", "Unidad Modular", "Combo Familiar", "Plan Corporativo", "Dispositivo Eco",
  "Suplemento Vital", "Curso Intensivo", "Plataforma Plus", "Software Ágil", "Herramienta Pro"
]

product_categories = [
  "Alimentos", "Tecnología", "Servicios", "Salud", "Educación",
  "Finanzas", "Transporte", "Agricultura", "Construcción", "Comercio",
  "Manufactura", "Energía", "Turismo"
]

companies_data.each do |data|
  department = departments.sample
  cities = cities_by_department[department.id]
  next if cities.blank?

  city = cities.sample

  company = Company.create!(
    name: data[:name],
    category: data[:category],
    phone_number: data[:phone],
    address: data[:address],
    assets: data[:assets],
    liabilities: data[:liabilities],
    department_id: department.id,
    city_id: city.id
  )

  rand(3..5).times do
    Product.create!(
      name: product_names.sample,
      category: product_categories.sample,
      price: rand(50_000..500_000),
      company_id: company.id
    )
  end
end
