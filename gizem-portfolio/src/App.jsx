import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, X, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import profileImage from './assets/profile.jpg'
import './App.css'

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Chat functionality
  const sendMessage = async () => {
    if (!chatInput.trim()) return
    
    const userMessage = { role: 'user', content: chatInput }
    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')
    setIsLoading(true)

    try {
      const response = await fetch('https://9yhyi3c8zg05.manus.space/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: chatInput.trim() })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      const botResponse = { 
        role: 'assistant', 
        content: data.response || 'Üzgünüm, bir hata oluştu.'
      }
      setChatMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Chat error:', error)
      const errorResponse = { 
        role: 'assistant', 
        content: 'Üzgünüm, şu anda bir teknik sorun yaşıyorum. Lütfen daha sonra tekrar deneyin.'
      }
      setChatMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const closeChatAndReset = () => {
    setIsChatOpen(false)
    setChatMessages([])
    setChatInput('')
  }

  const skills = [
    'Python', 'JavaScript', 'TypeScript', 'C/C++', 'Java', 'C#',
    'React Native', 'Angular', 'FastAPI', 'Docker', 'SQL',
    'AI/ML', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Keras'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Gizem Gündüz</h1>
            <div className="hidden md:flex space-x-6">
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-blue-600 transition-colors">Hakkımda</button>
              <button onClick={() => scrollToSection('education')} className="text-gray-600 hover:text-blue-600 transition-colors">Eğitim</button>
              <button onClick={() => scrollToSection('experience')} className="text-gray-600 hover:text-blue-600 transition-colors">Deneyim</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-600 hover:text-blue-600 transition-colors">Beceriler</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-blue-600 transition-colors">İletişim</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <img
                src={profileImage}
                alt="Gizem Gündüz"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                Gizem Gündüz
              </h1>
              <p className="text-xl md:text-2xl text-blue-600 mb-6">
                Yazılım Mühendisi
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Yapay zeka ve web teknolojileri konusunda uzmanlaşmış, yenilikçi çözümler üreten yazılım mühendisi
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Hakkımda</h2>
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-gray-700">
                  Atılım Üniversitesi Yazılım Mühendisliği bölümünden (2020-2025) mezun olmuş bir Yazılım Mühendisiyim. 
                  Halkbank'ta frontend geliştirme (C#, JavaScript, TypeScript) ve İstanbul Teknik Üniversitesi'nde 
                  yapay zeka odaklı (Python) stajlar yapmıştım. Mezuniyet projem, X-ray görüntülerinden kalp hastalıklarını 
                  tespit eden yapay zeka destekli bir mobil sağlık uygulamasıdır. HSM tabanlı şifreleme servisleri, 
                  PDF'den JPG'ye dönüştürücü geliştirdim ve LLM tabanlı yapay zeka entegrasyonuna katkıda bulundum. 
                  Python, JavaScript, FastAPI, Docker ve React Native teknolojilerinde deneyim sahibiyim.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Eğitim</h2>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">Atılım Üniversitesi</CardTitle>
                <CardDescription className="text-lg">Yazılım Mühendisliği Lisans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Eylül 2020 - Haziran 2025</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Stajlar ve Projeler</h2>
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">Halkbank - Frontend Stajyeri</CardTitle>
                  <CardDescription>2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>İnternet bankacılığı platformunun geliştirilmesinde görev aldım</li>
                    <li>VeriBranch Framework kullanarak bankanın Döviz Kurları sayfasını tasarladım ve güncelledim</li>
                    <li>Kullandığım teknolojiler: C#, SQL, TypeScript, JavaScript</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">İstanbul Teknik Üniversitesi - Yapay Zeka Stajyeri</CardTitle>
                  <CardDescription>2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Otonom gemi sistemlerinin temel geliştirme süreçlerine katkıda bulundum</li>
                    <li>Yapay Zeka, Makine Öğrenmesi ve Derin Öğrenme konularında temel bilgi edindim</li>
                    <li>Kullandığım teknoloji: Python</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">Yapay Zeka Tabanlı Mobil Sağlık Uygulaması</CardTitle>
                  <CardDescription>Bitirme Projesi - 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>X-ray görüntülerinden kalp hastalıklarını tespit eden mobil uygulama geliştirdim</li>
                    <li>HSM servisinin tüm geliştirmesini gerçekleştirdim</li>
                    <li>PDF dosyalarını JPG dosyalarına dönüştüren pdf2jpg servisini geliştirdim</li>
                    <li>OpenAI tabanlı LLM entegrasyonunda takım arkadaşlarımla çalıştım</li>
                    <li>React Native ile frontend geliştirdim</li>
                    <li>FastAPI ve Docker kullanarak mikroservis mimarisi kurdum</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Teknik Beceriler</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Badge variant="secondary" className="text-sm py-2 px-4 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">İletişim</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>gizemgunduz77@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span>Türkiye</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Mesaj Gönder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Adınız" />
                  <Input placeholder="E-posta adresiniz" />
                  <Textarea placeholder="Mesajınız" className="min-h-[100px]" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Mesaj Gönder
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; 2025 Gizem Gündüz. Tüm hakları saklıdır.</p>
        </div>
      </footer>

      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Gizem Gündüz Asistanı</h3>
              <button
                onClick={closeChatAndReset}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.length === 0 && (
                <div className="text-gray-500 text-sm">
                  Merhaba! Gizem Gündüz hakkında sorularınızı sorabilirsiniz.
                </div>
              )}
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white ml-auto max-w-[80%]'
                      : 'bg-gray-100 text-gray-800 mr-auto max-w-[80%]'
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg mr-auto max-w-[80%]">
                  Yazıyor...
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="icon" className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

