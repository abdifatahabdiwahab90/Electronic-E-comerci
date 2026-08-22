import Contact from "../models/contactSchema.js";
import { logActivity } from "../services/activityService.js";

export const listContacts = async (_, res, next) => { try { res.json(await Contact.find().sort({ createdAt: -1 })); } catch (error) { next(error); } };
export const createContact = async (req, res, next) => { try { const contact = await Contact.create({ ...req.body, id: `MSG-${Date.now()}` }); await logActivity(`New message: ${contact.subject} - ${contact.name}`, "contact"); res.status(201).json(contact); } catch (error) { next(error); } };
export const updateContactStatus = async (req, res, next) => { try { const contact = await Contact.findOneAndUpdate({ id: req.params.id }, { status: req.body.status }, { new: true }); if (!contact) return res.status(404).json({ message: "Contact not found." }); res.json(contact); } catch (error) { next(error); } };
export const removeContact = async (req, res, next) => { try { await Contact.deleteOne({ id: req.params.id }); res.status(204).end(); } catch (error) { next(error); } };
