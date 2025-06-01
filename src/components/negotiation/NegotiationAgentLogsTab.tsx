
const NegotiationAgentLogsTab = () => {
  const mockAgentLogs = [
    { time: '14:32', action: 'Started polling for replies', type: 'info' },
    { time: '14:35', action: 'Received DM reply from creator', type: 'success' },
    { time: '14:36', action: 'Generated response using LLM', type: 'info' },
    { time: '14:37', action: 'Sent negotiation counter-offer', type: 'success' },
    { time: '14:40', action: 'Waiting for creator response...', type: 'pending' }
  ];

  return (
    <div className="px-6 h-full overflow-y-auto">
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-[#1D1D1F] font-sans mb-4">
          Agent Activity
        </h4>
        {mockAgentLogs.map((log, index) => (
          <div key={index} className="bg-[#F2F2F7] rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-[#1D1D1F] font-sans">
                  {log.action}
                </p>
                <p className="text-sm text-[#8E8E93] font-sans mt-2">
                  {log.time}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                log.type === 'success' ? 'bg-[#34C759]' :
                log.type === 'pending' ? 'bg-[#FF9500]' :
                'bg-[#0071E3]'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NegotiationAgentLogsTab;
