const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@turismoantigua.com' },
      update: {},
      create: {
        email: 'admin@turismoantigua.com',
        password: hashedPassword,
        name: 'Administrator',
        role: 'ADMIN'
      }
    })
    
    console.log('Admin user created:', admin.email)
  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()