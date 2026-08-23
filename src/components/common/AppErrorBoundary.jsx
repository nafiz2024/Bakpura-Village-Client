import { Component } from 'react'

export default class AppErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return <main className="not-found"><div><p className="eyebrow">ত্রুটি</p><h1>পেজটি দেখানো যাচ্ছে না</h1><p>একটি অপ্রত্যাশিত সমস্যা হয়েছে। পেজটি রিফ্রেশ করে আবার চেষ্টা করুন।</p><button className="button button--primary" type="button" onClick={() => window.location.assign('/')}>হোমে ফিরুন</button></div></main>
    }
    return this.props.children
  }
}
