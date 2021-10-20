import express from 'express'
import { registerController, userController, employeeController, billUnitController, paymentController, adminController } from '../controllers'


const router = express.Router();

router.post('/register', registerController.register)

// users routes
router.get('/users', userController.getUsers)
router.get('/user/:id', userController.getOneUsers)
router.post('/user', userController.addUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)


// bill routes
router.put('/user-bill/:id', userController.billUpdate)
router.put('/pay-bill/:id', userController.payBill)
router.get('/fetch-bill/:phone', userController.fetchBill)

// set bill routes
router.get('/bill-info', billUnitController.getBillInfo)
// router.post('/bill-info', billUnitController.addBillInfo)
router.put('/bill-info', billUnitController.updateBillInfo)

// employee routes
router.get('/employees', employeeController.getEmployee)
router.get('/employee/:id', employeeController.getOneEmployee)
router.post('/employee', employeeController.addEmployee)
router.delete('/employee/:id', employeeController.deleteEmployee)
router.post('/validate-employee', employeeController.validateEmployee)


// payment route
router.post('/make-payment', paymentController.doPayment)
router.post('/payment-success', paymentController.paymentSuccess)
router.get('/transactions', paymentController.allTransactions)
router.get('/transaction/:id', paymentController.getOneTransaction)

// admin route
router.get('/admins', adminController.getAdmin)
router.post('/admin', adminController.addAdmin)
router.post('/validate-admin', adminController.validateAdmin)
router.delete('/admin/:id', adminController.deleteAdmin)

export default router