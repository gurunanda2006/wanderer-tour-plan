"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Users, Phone, Plus, Edit, Trash2, UserCheck } from "lucide-react"

export function EmergencyContacts() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      relationship: "Spouse",
      phone: "+91 98765 43210",
      email: "john.doe@email.com",
      priority: "Primary",
    },
    {
      id: 2,
      name: "Jane Smith",
      relationship: "Sister",
      phone: "+91 87654 32109",
      email: "jane.smith@email.com",
      priority: "Secondary",
    },
    {
      id: 3,
      name: "Mike Johnson",
      relationship: "Friend",
      phone: "+91 76543 21098",
      email: "mike.johnson@email.com",
      priority: "Secondary",
    },
  ])

  const [isAddingContact, setIsAddingContact] = useState(false)
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    priority: "Secondary",
  })

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([
        ...contacts,
        {
          ...newContact,
          id: Date.now(),
        },
      ])
      setNewContact({
        name: "",
        relationship: "",
        phone: "",
        email: "",
        priority: "Secondary",
      })
      setIsAddingContact(false)
    }
  }

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    return priority === "Primary"
      ? "bg-red-500/10 text-red-600 border-red-500/20"
      : "bg-blue-500/10 text-blue-600 border-blue-500/20"
  }

  return (
    <div className="space-y-6">
      {/* Emergency Contacts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Emergency Contacts
          </CardTitle>
          <CardDescription>People who will be notified in case of emergency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                    <p className="text-sm text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(contact.priority)}>
                    {contact.priority}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteContact(contact.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Emergency Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Emergency Contact</DialogTitle>
                  <DialogDescription>Add a trusted person who can be contacted in emergencies</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                      placeholder="e.g., Spouse, Parent, Friend"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddContact} className="flex-1">
                      Add Contact
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Contact Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How Emergency Contacts Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p>When you activate SOS mode, all emergency contacts receive an immediate notification</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p>Primary contacts are notified first, followed by secondary contacts</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p>Your live location is automatically shared with all emergency contacts</p>
            </div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">4</span>
              </div>
              <p>Contacts receive SMS and email alerts with your location and emergency details</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
