import Window from './Window'


export default function ResumeWindow({ onClose }: { onClose: () => void }) {
  return (
    <Window
      id="resume"
      title="Resume"
      onClose={onClose}
      initialMaximized={true}
    >
      <div className="p-4 h-full">
        <iframe
          src="/resume-data-engineer.pdf"
          width="100%"
          height="100%"
          title="Resume"
        />
      </div>
    </Window>
  )
}
